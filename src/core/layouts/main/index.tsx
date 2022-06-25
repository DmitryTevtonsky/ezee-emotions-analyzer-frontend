import { Link, Outlet, Route, Routes } from 'react-router-dom';
import React, { FC, Suspense, memo } from 'react';

import { Analyzer } from 'features';

import { Result } from 'antd';
import css from './index.module.css';

const About = () => {
  return (
    <div className={css.about}>
      <span>DEMO: http://84.252.137.43</span>
      <span>API: http://84.252.137.43:3000/swagger</span>
      <span>Github Фронтенд: https://github.com/DmitryTevtonsky/ezee-emotions-analyzer-frontend</span>
      <span>Github Бэкенд сервис: https://github.com/DmitryTevtonsky/ezee-emotions-analyzer-frontend</span>
      <span>Github DataScience сервис: </span>
      <br />
    </div>
  );
};

const Main: FC = () => {
  return (
    <div className={css.scroller}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Analyzer />} />
            <Route path="/about" element={<About />} />

            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Страница не существует"
                  extra={<Link to="/">Вернуться на главную</Link>}
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default memo(Main);
