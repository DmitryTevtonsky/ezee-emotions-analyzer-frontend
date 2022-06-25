import { io } from 'socket.io-client';
import React, { FC, useEffect } from 'react';

import { AnalyzeInitialData } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { Loader } from 'core/components/loader';

import { Controls, ResultTable } from '../components';
import { selectInitialData } from '../redux/selectors';

import css from './index.module.css';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => (
    <>
      Успешно: {data.path}
      <br />
      <ResultTable data={data} />
    </>
  ),
  () => <></>,
  () => <Loader />,
  () => <>request failed</>
);

const AnalyzerIndex: FC = () => {
  const analyzeInitialData = useAppSelector(selectInitialData);

  useEffect(() => {
    const socket = io('http://84.252.137.43:3000');

    socket.on('connect', () => {
      console.log('connect'); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('finished', (msg: any) => {
      console.log('finished', msg); // undefined
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
