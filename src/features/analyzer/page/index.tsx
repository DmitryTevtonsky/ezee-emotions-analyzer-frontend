import React, { FC } from 'react';

import { AnalyzeInitialData } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { Loader } from 'core/components/loader';

import { Controls, ResultTable } from '../components';
import { selectInitialData } from '../redux/selectors';

import css from './index.module.css';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => <>
  Успешно: {data.path}
  <br></br>
  <ResultTable data={data.data}></ResultTable>
  </>,
  () => <></>,
  () => <Loader />,
  () => <>request failed</>
);

const AnalyzerIndex: FC = () => {
  const analyzeInitialData = useAppSelector(selectInitialData);

  return (
    <div className={css.layout}>
      <Controls />
      {analyzerInitialDataFolder(analyzeInitialData)}
    </div>
  );
};

export default AnalyzerIndex;
