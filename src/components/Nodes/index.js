import DataSourceNode from "./DataSourceNode";
import MathNode from "./MathNode";
import FilterNode from "./FilterNode";
import ActionNode from "./ActionNode";

export const nodeTypes = {
  dataSource: DataSourceNode,
  mathOperation: MathNode,
  filterCondition: FilterNode,
  actionTrigger: ActionNode,
};

export { DataSourceNode, MathNode, FilterNode, ActionNode };
