import { ChevronDown, ChevronRight, Table } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TableSelectProps = {
  editor: any;
};

const TableSelect = ({ editor }: TableSelectProps) => {
  const TABLE_OPERATIONS = [
    { label: "Insert Table", value: "insert_table" },
    { label: "Delete Table", value: "delete_table" },
    {
      label: "Insert Row Above",
      value: "insert_row_above",
      disabled: !editor.can().addColumnBefore(),
    },
    {
      label: "Insert Row Below",
      value: "insert_row_below",
      disabled: !editor.can().addColumnAfter(),
    },
    {
      label: "Delete Row",
      value: "delete_row",
      disabled: !editor.can().deleteRow(),
    },
    {
      label: "Insert Column Before",
      value: "insert_column_before",
      disabled: !editor.can().addColumnBefore(),
    },
    {
      label: "Insert Column After",
      value: "insert_column_after",
      disabled: !editor.can().addColumnAfter(),
    },
    {
      label: "Delete Column",
      value: "delete_column",
      disabled: !editor.can().deleteColumn(),
    },
  ];

  const handleTableOperation = (value: string) => {
    if (!editor) return;

    switch (value) {
      case "insert_table":
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
        break;
      case "delete_table":
        editor.chain().focus().deleteTable().run();
        break;
      case "insert_row_above":
        editor.chain().focus().addRowBefore().run();
        break;
      case "insert_row_below":
        editor.chain().focus().addRowAfter().run();
        break;
      case "delete_row":
        editor.chain().focus().deleteRow().run();
        break;
      case "insert_column_before":
        editor.chain().focus().addColumnBefore().run();
        break;
      case "insert_column_after":
        editor.chain().focus().addColumnAfter().run();
        break;
      case "delete_column":
        editor.chain().focus().deleteColumn().run();
      default:
        break;
    }
  };

  return (
    <DropdownMenu
    >
      <DropdownMenuTrigger asChild>

        <Button variant="ghost" className="text-primary-text" type="button">
          <Table /> Table
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-0 p-0 " align="start">
        {/* <div className="sticky top-0 z-10 backdrop-blur-sm">
          <DropdownMenuLabel className=" ">Tags</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </div> */}
        {TABLE_OPERATIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => handleTableOperation(option.value)}
            disabled={option.disabled}
            title={option.label}
            onClick={(e) => {
              e.stopPropagation();
              // option.onClick && option.onClick();
            }}
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-normal outline-none transition-colors focus:bg-accent",
              option.disabled && "pointer-events-none opacity-50",
              // option.icon && "pl-3",
              // option.titleClassName,
            )}
          >
            {/* {option.icon && <span className="mr-2">{option.icon}</span>} */}
            {option.label}
            {/* {true && (
              <ChevronRight className="ml-auto h-4 w-4" />
            )} */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableSelect;
