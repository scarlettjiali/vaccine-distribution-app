
const DISPLAY_LENGTH = 8
const COL_PER_ROW = 4

const Header = ({ vender }) => {
    const dataWithAppointments = vender?.data?.features.filter((v) => v.properties.appointments !== null && v.properties.appointments?.length !== 0)
    const sliceData = dataWithAppointments.slice(0, Math.min(vender?.data.features.length, DISPLAY_LENGTH))
    const rows = [...Array(Math.ceil(sliceData.length / COL_PER_ROW))];
    const storeRows = rows.map((row, idx) => sliceData.slice(idx * COL_PER_ROW, idx * COL_PER_ROW + COL_PER_ROW));
    return (
        <div className='cardGrid'>
            {storeRows.map((stores, idx) => (
                <div className="row" key={idx}>
                    {stores.map(s => <div key={s.properties.address} className="column">
                        <div className="card"><b>{s.properties.name}</b>{s.properties.address}, {s.properties.city} {s.properties.state}
                        <button type="button" className="btn btn-danger">Info</button>
                        </div>
                    </div>
                )}
                </div>)
            )}
        </div>
    );
};

export default Header;
