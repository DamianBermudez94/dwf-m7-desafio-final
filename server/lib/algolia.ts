// For the default version
import algoliasearch from 'algoliasearch';

const client = algoliasearch('JSTB90O92R', '991bef075cb0635a0c29681cf168fdd9');
const indexPets = client.initIndex('pets');
export { indexPets }