import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import '../../assets/styles/index.scss'
import { store } from '../../store/store'
import Router from './Router'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<Router />
		</Provider>
	</QueryClientProvider>
)
