import { combineResolvers } from 'graphql-resolvers'
import { authorization } from '../helpers/authorization'
import {Op} from 'sequelize'

export default {
    Query: {
        members: combineResolvers(
            authorization,
            async (_,{limit, page}, {models, userLogin}) => {
                const offset:number = (page-1)*limit
                const members = await models.Member.findAndCountAll({
                    limit, offset, order: [['createdAt', 'DESC']],
                    where: { masterId: userLogin.id }
                })
                if (members.rows.length === 0) {
                    return { tasks: null }
                }
                const perPage = Math.ceil(members.count/limit)
                const pageInfo = {
                    nextPage: page < perPage,
                    currentPage: page,
                    prevPage: page > 1,
                    totalPage: perPage,
                    totalData: members.count
                }
                return {members: members.rows, pageInfo}
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
        ),
        member: combineResolvers(
            authorization,
            async (_, {id}, {models, userLogin}) => {
                const member = await models.Member.findOne({ where: { id, masterId: userLogin.id },
                     raw: true
                })
                const memberTasks = await models.Task.findAll({where:{ memberId: id }})
                const responseData = {
                    member,
                    tasks: memberTasks
                }
                return responseData
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