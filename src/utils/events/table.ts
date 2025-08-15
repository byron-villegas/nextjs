
const onRowMouseMove = (e: any) => {
    e.currentTarget.classList.add('hovered');
};

const onRowMouseLeave = (e: any) => {
    e.currentTarget.classList.remove('hovered');
};

const Table = { onRowMouseMove, onRowMouseLeave };

export default Table;