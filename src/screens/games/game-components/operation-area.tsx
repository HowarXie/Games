import { Direction } from "../infrastructure"
import DirectionOperations from "./direction-operations";
import ProcessOperations, { ProcessOperationsProps } from "./process-operations";
import "./operation-area.css";

const OperationArea = (props: OperationAreaProps): JSX.Element => {
    const { moveTo, ...processOperationsProps } = props;

    return (
        <div className="operation-area card">
            {!!props.moveTo && <DirectionOperations moveTo={props.moveTo}></DirectionOperations>}
            <ProcessOperations {...processOperationsProps}></ProcessOperations>
        </div>
    );
}

export interface OperationAreaProps extends ProcessOperationsProps {
    moveTo?: (direction: Direction) => void,
}

export default OperationArea;