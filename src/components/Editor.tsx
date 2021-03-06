/*
    Modul: Editor.tsx
    Autor: Hůlek Matěj
*/

import React from "react";
import AceEditor, { IMarker } from "react-ace";
import { StagesState } from '../sim_core/pipeline';
import 'brace/mode/mips_assembler';
import "brace/theme/sqlserver"

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

type EditorProps = {
    value: string,
    setValue: (string) => void,
    assembled: boolean,
    stagesState: StagesState
};

const Editor: React.FC<EditorProps> = (props) => {

    let markers: IMarker[] = []

    for (const prop in props.stagesState) {
        if (props.stagesState[prop].instruction.line !== -1) {
            markers.push({
                startRow: props.stagesState[prop].instruction.line - 1, type: "fullLine", className: prop + "_stage",
                startCol: 0, endCol: props.stagesState[prop].instruction.originalNotation.length, endRow: props.stagesState[prop].instruction.line - 1
            })
        }
    }

    return (
        <div style={{ height: "85vh", overflow: "auto" }}>
            <AceEditor
                className={"IDE"}
                mode="mips_assembler"
                theme={"sqlserver"}
                fontSize={16}
                style={{ height: "100%", width: "100%", minHeight: "100%" }}
                name="mipsIDE"
                editorProps={{ $blockScrolling: true }}
                setOptions={{ tabSize: 4, wrap: false, maxLines: Infinity }}
                showPrintMargin={false}
                value={props.value}
                onChange={(value) => {
                    props.setValue(value)
                }}
                readOnly={props.assembled}
                markers={props.assembled ? markers : []}
                highlightActiveLine={!props.assembled}
            />
        </div>
    )
}

export default React.memo(Editor);