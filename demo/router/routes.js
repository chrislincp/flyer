import Tabs from '../views/tabs'
import {
  ActionSheetPage,
  ActivityIndicatorPage,
  ButtonPage,
  CardPage,
  CarouselPage,
  DialogPage,
  DragListPage,
  FoldedPanelPage,
  FormPage,
} from '../views/components'

const components = {
  ActionSheetPage,
  ActivityIndicatorPage,
  ButtonPage,
  CardPage,
  CarouselPage,
  DialogPage,
  DragListPage,
  FoldedPanelPage,
  FormPage,
}
const routes = {
  Tabs,
  ...components,
}

export default routes
