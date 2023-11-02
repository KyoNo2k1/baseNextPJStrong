import {Ability, AbilityBuilder} from '@casl/ability'

type Actions = string;


/**
 *
 * @param data like [
 *         "R_MARKET.UPDATE",
 *         "R_MARKET.DELETE",
 *         "R_GSA.UPDATE",
 *         "R_AGENT_USER.READ",
 *         "R_VNA_USER.UPDATE",
 *         "R_VNA_USER.CREATE",
 * ]
 * @return reponse like {
 *    R_MARKET: [ 'UPDATE', 'DELETE', 'CREATE', 'READ' ],
 *    R_CA: [ 'READ', 'UPDATE', 'DELETE', 'CREATE' ],
 *   R_GSA_USER: [ 'UPDATE', 'DELETE', 'READ', 'CREATE' ]
 *   }
 */
function createDataMap(data: string[]): Record<string, string[]> {
    const dataMap: Record<string, string[]> = {};
    data.forEach((item) => {
        const [key, value] = item.split('.');
        if (!dataMap[key]) {
            dataMap[key] = [];
        }
        if (value) {
            dataMap[key].push(value);
        }
    });
    return dataMap;
}

export default function AbilityConfig(permissions?: string[]| undefined) {
    const {can, build} = new AbilityBuilder(Ability<[Actions, any]>);
    // can('manage', 'all')
    if(permissions){
        if (permissions.includes("SUPER_ADMIN")) {
            can('manage', 'all');
        }
        else {
            const abilities = createDataMap(permissions)
            Object.keys(abilities).map(keys => {
                abilities[keys].map(action => {
                    can(action as Actions, keys)
                })
            })
        }
    }

    return build();
}


