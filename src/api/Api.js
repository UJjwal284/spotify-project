export async function getData(endpoint, method, body) {
    const token = 'BQAT_tZoS1TJ4-gzUnL4K7I7cK4loUkgLWY-5BgqL5FmjVIs4nWN34caMoRetz4uv1SAYzDTenOJlhHSNMxtIMexBl05FO_h5_FgB_r8HYc6dXz9v_IejCp4A7SNGzzAO6zaSMGxGy8P6J9JVzvYTZ5MonpoIaAq-nPh28d7chaFhO2Pfb7r7TeqN--JdB_7GUMdasKI4heLuPg37H-iwm4nMa6ndQ1gFscYuQYKzFG-WS4e9IVL9zbb390CBomIduUJ8_OVxeMkJE1HU-8iUNfM63NxyjjzDIDU10aw16WSEOwZvnRVzK0joJGTUXllL6FYD7lD1P6oG7_LadyqhfI3Zs2qxs71-eTsfoDczVVqIk0';
    return await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }, method, body: JSON.stringify(body)
    })
}