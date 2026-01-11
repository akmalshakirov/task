import { UserRoundMinus, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
                        {columns.map((col) => (
                            <td
                                key={col.key ?? rowIdx}
                                className='px-4 py-3 text-center text-sm text-gray-100 text-nowrap'>
                                {item[col.key] == item.username && "@"}
                                {item[col.key]}
                            </td>
                        ))}

                        {actions && (
                            <td className='px-4 py-3 flex justify-center items-center gap-2'>
                                {actions?.edit && (
                                    <button
                                        aria-label={`Click to edit user ${item.firstName}`}
                                        title={`Click to edit user ${item.firstName}`}
                                        className='bg-primary border border-gray-500 rounded-lg p-2 cursor-pointer hover:bg-gray-700 transition outline-none focus:ring-3 focus:ring-blue-500/80'
                                        onClick={() =>
                                            navigate(`/user/${item.id}`)
                                        }>
                                        <UserRoundPen size={18} />
                                    </button>
                                )}
                                {actions?.delete && (
                                    <button
                                        aria-label={`Delete user named ${item.firstName}`}
                                        title={`Delete user named ${item.firstName}`}
                                        className='bg-red-700/30 border border-red-700/70 rounded-lg p-2 cursor-pointer hover:bg-red-600/60 transition outline-none focus:ring-3 focus:ring-red-500/40'
                                        onClick={() => deleteFunc(item)}>
                                        <UserRoundMinus size={18} />
                                    </button>
                                )}
                                {actions?.info && (
                                    <td className='px-1.5 py-2 text-sm text-gray-300'>
                                        <button className='border rounded-lg p-4 cursor-pointer hover:bg-primary'>
                                            Info
                                        </button>
                                    </td>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
