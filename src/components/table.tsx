import { UserRoundMinus } from "lucide-react";
import type { TableActions, TableColumns, UserType } from "../types/userType";

const Table = ({
    data,
    columns,
    actions,
    deleteFunc,
}: {
    data: UserType[] | null;
    columns: TableColumns[];
    actions?: TableActions;
    deleteFunc: (item: UserType) => void;
}) => {
    return (
        <table className='w-full'>
            <thead className='bg-primary/50'>
                <tr>
                    {columns?.map((col, i) => (
                        <th
                            key={col.key ?? i}
                            scope='col'
                            className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-nowrap text-center'>
                            {col.header}
                        </th>
                    ))}
                    {actions && (
                        <th className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-center text-nowrap'>
                            Actions
                        </th>
                    )}
                </tr>
            </thead>

            <tbody className='divide-y divide-gray-500'>
                {data?.map((item, rowIdx) => (
                    <tr
                        key={item?.id ?? rowIdx}
                        className='hover:bg-white/7 transition even:bg-primary/30'>
                        {columns.map((col) => {
                            return (
                                <td
                                    key={col.key ?? rowIdx}
                                    className='px-4 py-3 text-center text-sm text-gray-100 text-nowrap'>
                                    {item[col.key] == item.username && "@"}
                                    {item[col.key]}
                                </td>
                            );
                        })}

                        {actions && (
                            <td className='px-4 py-3 text-right'>
                                <div className='inline-flex items-center gap-2'>
                                    {actions?.delete && (
                                        <button
                                            aria-label={`Delete user named ${item.firstName}`}
                                            title={`Delete user named ${item.firstName}`}
                                            className='bg-red-700/30 border border-red-700/70 rounded-lg p-2 cursor-pointer hover:bg-red-600/60 transition outline-none focus:ring-3 focus:ring-red-500/40'
                                            onClick={() => deleteFunc(item)}>
                                            <UserRoundMinus size={18} />
                                        </button>
                                    )}
                                    {actions?.edit && (
                                        <td className='px-1.5 py-2 text-sm text-gray-300'>
                                            <button className='border rounded-lg p-4 cursor-pointer hover:bg-primary'>
                                                Edit
                                            </button>
                                        </td>
                                    )}
                                    {actions?.info && (
                                        <td className='px-1.5 py-2 text-sm text-gray-300'>
                                            <button className='border rounded-lg p-4 cursor-pointer hover:bg-primary'>
                                                Info
                                            </button>
                                        </td>
                                    )}
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
