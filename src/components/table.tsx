import { UserRoundMinus } from "lucide-react";
import type { TableActions, TableColumns, UserType } from "../types/userType";

const Table = ({
    data,
    columns,
    actions,
}: {
    data: UserType[] | null;
    columns: TableColumns[];
    actions?: TableActions;
}) => {
    return (
        <table className='w-full'>
            <thead
                className={`grid grid-cols-${
                    actions ? "8" : "7"
                } grid-flow-row`}>
                {columns.map((c, index) => (
                    <tr key={c.key ?? index}>
                        <th
                            scope='col'
                            className='font-medium uppercase text-center tracking-wider text-xs md:text-base px-1.5 py-2 text-gray-300'>
                            {c.header}
                        </th>
                    </tr>
                ))}
                {actions && (
                    <tr>
                        <th className='font-medium uppercase tracking-wider text-xs md:text-base text-nowrap px-1.5 py-2 text-gray-300'>
                            Actions
                        </th>
                    </tr>
                )}
            </thead>
            <tbody className='divide-y divide-gray-500'>
                {data?.map((i) => (
                    <tr
                        className={`hover:bg-gray-50/10 transition grid grid-cols-${
                            actions ? "8" : "7"
                        } items-center`}
                        key={i.id}>
                        {columns.map((col, rowIdx) => (
                            <td
                                scope='row'
                                key={col.key ?? rowIdx}
                                className={`py-4 text-sm text-gray-300 break-all text-center`}>
                                {i[col.key] == i.username && "@"}
                                {i[col.key]}
                            </td>
                        ))}
                        <td className='text-sm text-gray-300 px-1.5 py-2'>
                            {actions?.delete && (
                                <button
                                    aria-label={`Delete user named ${i.firstName}`}
                                    title={`Delete user named ${i.firstName}`}
                                    className='bg-red-400/10 border border-red-700/70 rounded-lg p-2 cursor-pointer hover:bg-red-600/60'
                                    onClick={() => alert(i.id)}>
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
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
