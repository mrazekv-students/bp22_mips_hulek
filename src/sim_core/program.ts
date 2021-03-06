/*
    Modul: program.ts
    Autor: Hůlek Matěj
*/

import * as I from "./instruction";
import * as P from "./pipeline"
import { setError } from "../App"

export interface Ilabel {
    line: number,
    address: number,
    name: string
}

const textSegmentStart: number = 0x04000000
const textSegmentEnd: number = 0x0ffffffc

export class Program {
    private Instructions: I.IInstruction[];
    private LabelsT: Ilabel[];
    private PC: number = textSegmentStart;
    constructor() {
        this.Instructions = []
    }

    setProgram(program: I.IInstruction[], labels: Ilabel[]): void {
        let address = textSegmentStart
        program.forEach(e => { e.address = address; address += 4 })

        labels.forEach(e => {
            let index = program.findIndex(x => x.line >= e.line);
            e.address = index === -1 ? program[program.length - 1].address + 4 : program[index].address
        });
        this.Instructions = program
        this.LabelsT = labels
    }

    getLabel(name: string): Ilabel {
        let label = this.LabelsT.find(x => x.name === name)
        if (label === undefined) {
            setError(`Label ${name} not found`)
            throw new Error("");

        }
        return label
    }

    setPCofLabel(name: string): void {
        this.PC = this.getLabel(name).address
    }

    getPC(): number {
        return this.PC
    }

    setPC(address: number): void {
        if (address < textSegmentStart || address > textSegmentEnd) {
            setError(`PC ${address} out of range`)
        }
        if (address % 4 !== 0) {
            setError(`PC ${address} not word aligned`)
        }
        this.PC = address
    }

    getNextInstruction(): P.IPipelineIns {
        let instruction = this.Instructions.find(x => x.address === this.PC)
        let ins: P.IPipelineIns
        if (instruction === undefined) {
            ins = { ...P.NOP, pc: this.PC + 4 }
        } else {
            ins = { instruction: instruction, pc: this.PC + 4 }
        }
        this.PC += 4
        return ins
    }
}