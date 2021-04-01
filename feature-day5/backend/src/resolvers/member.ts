import { combineResolvers } from 'graphql-resolvers'
import { authorization } from '../helpers/authorization'
import {Op} from 'sequelize'

export default {
    Query: {
        members: combineResolvers(
            authorization,
            async (_,{limit, page}, {models}) => {
                const offset:number = (page-1)*limit
                const members = await models.Member.findAll({
                    limit, offset, order: [['createdAt', 'DESC']]
                })
                return members
            }
        ),
        searchMember: combineResolvers(
            authorization,
            async (_, {name}, {models}) => {
                const member = await models.Member.findOne({
                    where: { name: { [Op.like]: `%${name}%`  } }, raw: true
                })
                return member
            }
        )
    },
    Mutation: {
        createMember: combineResolvers(
            authorization,
            async (_,{name}, {userLogin, models}) => {
                try {
                    const dataCreate = { name, masterId: userLogin.id }
                    await models.Member.create(dataCreate)
                    return 'Member has been created'
                } catch (error) {
                    return 'cannot create member'
                }
            }
        )
    }
}