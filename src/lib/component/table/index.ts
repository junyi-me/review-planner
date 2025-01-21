import Table from "./table.svelte";
import Td from "./tcell.svelte";
import Th from "./thcell.svelte";
import Thead from "./thead.svelte";
import Tr from "./trow.svelte";
import Pager from "./pager.svelte";

export { Table, Thead, Th, Td, Tr, Pager };

export type TdStatus = "normal" | "warning" | "danger" | "success";
export type SortDirection = "asc" | "desc";

