const adminAuth = (req,res,next)=>{
    const token='xyz';
    const isAdmin = token==='xyz';
    console.log("Handle Authentication");
    if(!isAdmin){
        res.status(401).send('Unauthorize Access');
    }
    else{
        next();
    }
}

module.exports = {adminAuth};