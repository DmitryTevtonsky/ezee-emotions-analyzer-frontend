import { io } from 'socket.io-client';
import React, { FC, useEffect } from 'react';

import { AnalyzeInitialData, DominantEmotion } from 'types';
import { fold } from 'libs/remote';
import { useAppDispatch, useAppSelector } from 'store';

import { Loader } from 'core/components/loader';

import { Controls, ResultTable } from '../components';
import { selectInitialData } from '../redux/selectors';

import { Typography } from 'antd';
import { setAnalysisData } from '../redux/slice';
import css from './index.module.css';

const { Title, Paragraph } = Typography;

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => (
    <>
      Успешно: {data.path}
      <br />
      <ResultTable data={data} />
    </>
  ),
  () => (
    <>
      <Typography>
        <Title level={2}>Важно!</Title>
        <Paragraph>
          На текущий момент система работает максимально стабильно, когда ее использует один человек.
        </Paragraph>
        <Paragraph>Cреднее время загрузки, обработки и возврата обработанного видео занимает 10-20 секунд </Paragraph>
        <Paragraph>В будущем будет улучшена параллельная работа и время реакции системы!</Paragraph>
      </Typography>
    </>
  ),
  () => <Loader />,
  () => <>request failed</>
);

const AnalyzerIndex: FC = () => {
  const dispatch = useAppDispatch();
  const analyzeInitialData = useAppSelector(selectInitialData);

  useEffect(() => {
    const socket = io('http://84.252.137.43:3000');

    socket.on('connect', () => {
      console.log('connect'); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('finished', (msg: DominantEmotion) => {
      console.log('finished', msg); // undefined

      dispatch(setAnalysisData(msg));
    });

    socket.on('disconnect', () => {
      console.log('disconnect'); // undefined
    });
  }, []);

  return (
    <div className={css.layout}>
      <Controls />
      {analyzerInitialDataFolder(analyzeInitialData)}
    </div>
  );
};

export default AnalyzerIndex;
