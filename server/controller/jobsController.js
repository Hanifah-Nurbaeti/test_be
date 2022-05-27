import { sequelize } from "../models/init-models";

const findAll = async (req,res) =>{
    try {
        const jobs  = await req.context.models.jobs.findAll({
             includes : [{
                 model : req.context.models.users
            }]
        });
        return res.send(jobs)
    } catch (error) {
        return res.status(404).send("not found")       
    }
}

const findOne  = async (req,res) => {
    try {
        const jobs = await req.context.models.jobs.findOne({
            where:{job_id:req.params.id}
        })
        return res.send(jobs)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const create = async (req,res) =>{
    try {
        const jobs = await req.context.models.jobs.create({
            type : req.body.type,
            location : req.body.location,
            description : req.body.description
        })
        return res.send(jobs)
    } catch (error) {
        return res.status(404).send("not found")
    }
}
const update = async (req,res)=>{
    const {type} = req.body
    const {location} = req.body
    const {description} = req.body
    try {
        const jobs = await req.context.models.jobs.update(
            {type : type},
            {location : location},
            {description : description},
            {returning : true, where :{job_id : req.params.id}}
        )
        return res.send(jobs)
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const remove = async (req,res)=>{
    try {
        const jobs = await req.context.models.jobs.destroy({
            where :  {job_id : req.params.id}
        })
        return res.send("delete"+jobs+"rows")
    } catch (error) {
        return res.status(404).send("not found")
    }
}

const rawSQL = async (req,res)=>{
    await sequelize.query('SELECT count(*) from jobs where job_id =:jobId',
    {replacements : {jobId : req.params.id},type : sequelize.QueryTypes.SELECT}
    ).then(result =>{
        return res.send(result)
    })
}

export default {
    findAll,
    findOne,
    create,
    update,
    remove,
    rawSQL
}