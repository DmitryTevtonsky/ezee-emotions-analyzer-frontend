/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SagaIterator } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { AnalyzeInitialData } from 'types';
import { pending, success } from 'libs/remote';

import { sendDataToAnalyzis, setInitialData } from './slice';

const axiosInstance = axios.create({
  baseURL: `${window.location.origin.replace(':8080', '')}:3000`, // 'http://127.0.0.1:3000',
});

console.log(`${window.location.origin.replace(':8080', '')}:3000`);

function* analyzerSaga(): SagaIterator {
  yield all([
    takeLatest(sendDataToAnalyzis, function* sendDataToAnalyzisSaga({ payload }) {
      try {
        yield put(setInitialData(pending()));

        console.log(payload);

        const formData = new FormData();

        formData.append('videoFile', payload.video!);

        const { data, status }: AxiosResponse<AnalyzeInitialData> = yield axiosInstance.post(
          '/api/init-class-analyze',
          formData
        );

        console.log('data, status', data, status);

        yield put(setInitialData(success(data)));

        const resultVideoPlaceholder = document.getElementById('result-video-placeholder');
        const video = document.createElement('video');
        video.setAttribute('src', 'http://techslides.com/demos/sample-videos/small.mp4');
        video.setAttribute('type', 'video/mp4');
        resultVideoPlaceholder?.appendChild(video);
      } catch (error) {
        const { response, config } = error as AxiosError;
        console.log({ status: response?.status, requestUrl: config?.url || '' });
      }
    }),
    // takeLatest(checkAnalysisData, function* checkAnalysisDataSaga({ payload }) {
    //   try {
    //     console.log(count);

    //     const { data }: AxiosResponse<AnalyzisData> = yield axiosInstance.get(`/api/analysis-results/${payload}`);

    //     console.log('checkAnalysisData', data);
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //     if (count < 20) {
    //       yield delay(10000);

    //       yield put(setAnalysisData(success(data)));
    //       yield put(checkAnalysisData(payload));
    //       count++;
    //     }

    //     yield put(setAnalysisData(success(data)));
    //     count = 0;
    //   } catch (error) {
    //     const { response, config } = error as AxiosError;
    //     console.log({ status: response?.status, requestUrl: config?.url || '' });

    //     yield delay(10000);
    //     yield put(checkAnalysisData(payload));

    //     // yield put(setAnalysisData(failure({ status: response?.status, requestUrl: config?.url || '' })));
    //   }
    // }),
  ]);
}

export default analyzerSaga;
