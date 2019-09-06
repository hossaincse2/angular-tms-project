
import { Statement } from "./statement";
import { StatementContractor } from "./statementContractor";

export class VMStatement {
    lstStatement: Statement[] = new Array<Statement>();
    lstStatementContractor: StatementContractor[] = new Array<StatementContractor>();
}