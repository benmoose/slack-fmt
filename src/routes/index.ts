import controller from '../controller'

const routes = (app) => {
  app.route('/slack/slash-commands/json')
    .post(controller.json.format)
}

export default routes
