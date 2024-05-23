async function addRegion(client, region) {
    const insertRegionQuery = `
        INSERT INTO public.regions(id, name)
        VALUES ($1, $2);
    `;

    try {
        await client.query(insertRegionQuery, region);
        console.log('Region added successfully.');
        return true;
    } catch (err) {
        console.error(`Error adding region: ${err}`);
        return false;
    }
}

async function getRegions(client) {
    const getRegionsQuery = `
        SELECT id, name FROM public.regions
        LIMIT 100;
    `;

    try {
        const result = await client.query(getRegionsQuery);
        return result.rows;
    } catch (err) {
        console.error(`Error getting regions: ${err}`);
        return [];
    }
}

module.exports = { getRegions, addRegion };