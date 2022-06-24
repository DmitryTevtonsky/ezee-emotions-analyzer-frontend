import React, { FC } from 'react';

import { AnalyzeInitialData } from 'types';
import { fold } from 'libs/remote';
import { useAppSelector } from 'store';

import { Controls } from '../components';
import { selectAnalyzisData, selectInitialData } from '../redux/selectors';

import AnalyzisFailure from './failure';
import AnalyzisLoading from './loading';
import AnalyzisSuccess from './success';

import css from './index.module.css';

const analyzerInitialDataFolder = fold<AnalyzeInitialData>(
  (data) => <AnalyzisSuccess data={data} />,
  () => <></>,
  () => <AnalyzisLoading />,
  (error) => <AnalyzisFailure error={error} />
);

const AnalyzerIndex: FC = () => {
  const analisisInitialData = useAppSelector(selectInitialData);

  const analisisData = useAppSelector(selectAnalyzisData);

  return (
    <div className={css.layout}>
      <Controls />
      {/* <iframe
          title="LIVE Nevskiy avenue St. Petersburg Russia, Gostiny Dvor. Невский пр. Санкт-Петербург, Гостиный двор"
          width="720"
          height="405"
          src="https://www.youtube.com/embed/h1wly909BYw"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        /> */}
      {analyzerInitialDataFolder(analisisInitialData)}
    </div>
  );
};

export default AnalyzerIndex;
