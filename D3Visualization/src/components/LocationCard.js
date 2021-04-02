const Header = ({ vender }) => {
    const sliceData = vender && vender?.data.features.slice(0, Math.min(vender?.data.features.length, 8))
    const rows = [...Array(Math.ceil(sliceData.length / 4))];
    const storeRows = rows.map((row, idx) => sliceData.slice(idx * 4, idx * 4 + 4));
    return (
        <div className='cardGrid'>
            {storeRows.map((stores, idx) => (
                <div className="row" key={idx}>
                    {stores.map(s => <div key={s.properties.address} className="col">
                        <div className="card"><b>{s.properties.name}</b>: {s.properties.address}, {s.properties.city} {s.properties.state}
                        </div>
                    </div> )}
                </div>)
            )}
        </div>
    );
};

export default Header;
