import { Style } from '../../themes'

const styles = {
  collapsedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: 'white',
    ...Style.bottomDivider,
  },
}

export default styles
