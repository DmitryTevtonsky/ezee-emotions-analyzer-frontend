import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AnalyzeInitialData, DominantEmotion, FormFields } from 'types';
import { RemoteData, initialized } from 'libs/remote';

export interface AnalyzerState {
  initialData: RemoteData<AnalyzeInitialData>;
  analyzisData: DominantEmotion | null;
}

const initialState: AnalyzerState = {
  initialData: initialized() as RemoteData<AnalyzeInitialData>,
  analyzisData: null,
};

export const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState,
  reducers: {
    sendDataToAnalyzis: (_state, _action: PayloadAction<FormFields>) => {},
    setInitialData: (state, action: PayloadAction<RemoteData<AnalyzeInitialData>>) => {
      state.initialData = action.payload;
    },
    checkAnalysisData: (_state, _action: PayloadAction<string>) => {},
    setAnalysisData: (state, action: PayloadAction<DominantEmotion>) => {
      state.analyzisData = action.payload;
    },
  },
});

export const { sendDataToAnalyzis, setInitialData, checkAnalysisData, setAnalysisData } = analyzerSlice.actions;
export default analyzerSlice.reducer;
