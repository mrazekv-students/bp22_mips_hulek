/*
    Modul: actions.ts
    Autor: Hůlek Matěj
*/

import { StagesState } from "./sim_core/pipeline";
import * as R from "./sim_core/register";

export const setOutputValue = (value: string) => {
    return {
        type: 'SET_OUTPUT_VALUE',
        payload: value
    }
}

export const extendOutputValue = (value: string) => {
    return {
        type: 'EXTEND_OUTPUT_VALUE',
        payload: value
    }
}

export const setInputValue = (value: string) => {
    return {
        type: 'SET_INPUT_VALUE',
        payload: value
    }
}

export const setStagesState = (state: StagesState) => {
    return {
        type: 'SET_STAGES_STATE',
        payload: state
    }
}

export const clearStageState = () => {
    return {
        type: 'CLEAR_STAGE_STATE'
    }
}

export const setRegisters = (registers: R.IAllRegister[]) => {
    return {
        type: 'SET_REGISTERS',
        payload: registers
    }
}

export const setError = (msg: string) => {
    return {
        type: 'SET_ERROR',
        payload: msg
    }
}

export const clearError = () => {
    return {
        type: 'CLEAR_ERROR'
    }
}

export const setMemoryBuffer = (buffer: ArrayBuffer) => {
    return {
        type: 'SET_MEMORY_BUFFER',
        payload: buffer
    }
}
