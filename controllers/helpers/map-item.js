module.exports = data => {
  return {
    ID: data.ID,
    module: data.module,
    system: data.system,
    screen: data.screen,
    component: data.component,
    field_desc: data.field_desc,
    test_desc: data.test_desc,
    desired_result: data.desired_result,
    project: data.project,
    status: data['status'] === 'True' ? true : false,
    group: data.group
  }
}