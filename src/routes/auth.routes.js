import {Router} from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verify_signup} from '../middlewares'

router.post('/signup', [verify_signup.checkDuplicateUsernameOrEmail, verify_signup.checkExistingRole], authCtrl.signUp)
router.post('/signin', authCtrl.signIn)

export default router