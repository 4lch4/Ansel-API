import LogRocket, { log } from 'logrocket'
import { AppConfig } from '../configs'

LogRocket.init(AppConfig.logRocketId)
LogRocket.identify(AppConfig.name, {})

log('LogRocket initialized')
