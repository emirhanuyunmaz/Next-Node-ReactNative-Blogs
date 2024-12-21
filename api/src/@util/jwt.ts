import * as jwt from "jsonwebtoken" 

const JWT = {
    
    createToken(id:string){
        const access_token = jwt.sign({
            id:id
        }, "helloWorld",{ expiresIn: '7d' });

        const refresh_token = jwt.sign({
            id:id
        }, "helloWorld",{ expiresIn: '30d' });
        return {access_token,refresh_token}
    },

    verifyToken(tokenData:string):any {
        try{
            return jwt.verify(tokenData,"helloWorld")
        }catch(err){
            return false
        }
    }
}

export default JWT