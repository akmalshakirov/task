import type { TableColumns, UserType } from "../types/userType";

const Table = ({
    data,
    columns,
}: {
    data: UserType[] | null;
    columns: TableColumns[];
}) => {
    return (
        <table>
            <thead>
                <tr className='flex gap-10 font-medium uppercase tracking-wider text-xs md:text-base text-nowrap'>
                    {columns.map((c, index) => (
                        <th scope='col' key={c.key ?? index}>
                            {c.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr className='flex gap-10 items-center justify-center'>
                    {data?.map((i) => (
                        <th scope='row' key={i.id}>
                            {columns.map((col) => i[col.key])}
                        </th>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
