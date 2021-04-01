import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { combineResolvers } from 'graphql-resolvers'
import { authorization } from '../helpers/authorization'

import pubsub, { EVENTS } from '../subscription/index'

export default {
    Query: {
        login: async(_, {username, password}, {models, userLogin}) => {
            try {
                const master = await models.Master.findOne({ where: { username: username }, raw: true })
                if (!master.username) {
                    throw new UserInputError('No user found with this username')
                }
                const checkPassword = await bcrypt.compareSync(password, master.passwordHash)
                if (!checkPassword) {
                    throw new AuthenticationError('Invalid Password')
                }
                const data = {id: master.id, username: master.username}
                const token = await jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1d"});
                return { token }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createMaster: combineResolvers(
            authorization,
            async (_,{ username, password }, { models }) => {
                try {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);
                    const master = await models.Master.create({ username, passwordHash: hash })
                    
                    pubsub.publish(EVENTS.MASTER.CREATED, {
                        masterCreated: { master }
                    })

                    return master
                } catch (error) {
                    throw new Error(error)
                }
            }
        )
    },
    Subscription: {
        masterCreated: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MASTER.CREATED)
        }
    }
}