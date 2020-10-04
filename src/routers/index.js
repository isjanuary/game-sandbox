import {
  EjectCar,
  CanvasTest,
  HelloWorld
} from "../components"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld,
  },
  {
    name: 'ejectCar',
    path: '/ejectcar',
    component: EjectCar
  },
  {
    path: '/canvastest',
    name: 'canvasTest',
    component: CanvasTest
  },
  {
    path: '/helloworld',
    name: 'helloWorld',
    component: HelloWorld
  }
]

export default routes