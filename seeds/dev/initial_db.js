let boulderGrades = ['V0', 'V1', 'V2', 'V3', 'V4',
    'V5', 'V6', 'V7', 'V9', 'V10',
    'V11', 'V12', 'V13', 'V14',
    'V15', 'V16', 'Vb']
let ropeGrades = ['5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
    '5.10a', '5.10b', '5.10c', '5.10d',
    '5.11a', '5.11b', '5.11c', '5.11d',
    '5.12a', '5.12b', '5.12c', '5.12d',
    '5.13a', '5.13b', '5.13c', '5.13d',
    '5.14a', '5.14b', '5.14c', '5.14d',
    '5.15a', '5.15b', '5.15c', '5.15d']

exports.seed = async function (knex, Promise) {
    // First delete everything so we don't get foreign key constraint headache
    await knex('route_type_grades').del()
    await knex('routes').del()
    await knex('grade').del()
    await knex('route_type').del()
    await knex('finish').del()
    await knex('gyms').del()

    // now seed data
    // Table: route_type
    await knex('route_type').insert([
        { 'type': 'boulder' },
        { 'type': 'top-rope' },
        { 'type': 'sport' },
        { 'type': 'trad' },
        { 'type': 'ice' },
        { 'type': 'mixed' }
    ])

    // Table: grade
    const allGrades = [...boulderGrades, ...ropeGrades]
    for (let grade of allGrades) {
        await knex('grade').insert([
            { 'rating': grade }
        ])
    }

    // Table: finish
    await knex('finish').insert([
        { 'type': 'project' },
        { 'type': 'send' },
        { 'type': 'flash' },
        { 'type': 'onsight' },
    ])

    // Table: gyms
    await knex('gyms').insert([
        { 'name': 'Dogpatch Boulders', 'address': '2573 3rd St', 'city': 'San Francisco', 'state': 'California', 'zip': '94107' },
        { 'name': 'Mission Cliffs', 'address': '2295 Harrison St', 'city': 'San Francisco', 'state': 'California', 'zip': '94110' }
    ])

    // Table: route_type_grades
    const boulder_id = (await knex('route_type').where({ 'type': 'boulder' }).select('id'))[0]['id'];
    for (let grade of boulderGrades) {
        const grade_id = (await knex('grade').where({ 'rating': grade }).select('id'))[0]['id'];
        await knex('route_type_grades').insert([
            { 'route_type_id': boulder_id, 'grade_id': grade_id }
        ])
    }

    const toprope_id = (await knex('route_type').where({ 'type': 'top-rope' }).select('id'))[0]['id'];
    const trad_id = (await knex('route_type').where({ 'type': 'trad' }).select('id'))[0]['id'];
    const sport_id = (await knex('route_type').where({ 'type': 'sport' }).select('id'))[0]['id'];
    const ice_id = (await knex('route_type').where({ 'type': 'ice' }).select('id'))[0]['id'];
    const mixed_id = (await knex('route_type').where({ 'type': 'mixed' }).select('id'))[0]['id'];
    for (let grade of ropeGrades) {
        const grade_id = (await knex('grade').where({ 'rating': grade }).select('id'))[0]['id'];
        await knex('route_type_grades').insert([
            { 'route_type_id': toprope_id, 'grade_id': grade_id },
            { 'route_type_id': trad_id, 'grade_id': grade_id },
            { 'route_type_id': sport_id, 'grade_id': grade_id },
            { 'route_type_id': ice_id, 'grade_id': grade_id },
            { 'route_type_id': mixed_id, 'grade_id': grade_id }
        ])
    }

    // Table: Routes
    const grade_id = (await knex('grade').where({ 'rating': 'V0' }).select('id'))[0]['id']
    const finish_id = (await knex('finish').where({ 'type': 'onsight' }).select('id'))[0]['id']
    await knex('routes').insert([{ 'route_type_id': toprope_id, 'grade_id': grade_id, 'finish_id': finish_id }])
};
