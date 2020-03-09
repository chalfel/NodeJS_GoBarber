import Appoitment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';

class AppoitmentController {

    store(req, res) {
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.json({ message: 'Invalid Parameters' });
        }
        const { provider_id, date } = req.body;

        const isProvider = await User.findOne(
            { where: {
                id: provider_id,
                provider: false
            }});
        
        if (!isProvider) {
            return res.json({ message: 'You can only make appointments with providers' });
        }

        return res.json({ msg: 'ok' });
    }
    
}


export default new AppoitmentController();