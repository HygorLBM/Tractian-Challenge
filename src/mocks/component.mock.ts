import { FakeInfoDTO } from "../dtos/fake-info.dto";
import add_image from '../assets/add_image.png';
import eletric_circle_icon from '../assets/eletric_circle_icon.svg';
import mechanic_circle_icon from '../assets/mechanic_circle_icon.svg';
import motor_1 from '../assets/motor_1.png';
import motor_2 from '../assets/motor_2.png';

export const componentMocks:FakeInfoDTO[] = [
    {
        image: motor_1,
        responsible: 'Elétrica',
        responsibleIcon: eletric_circle_icon,
        sensor: 'HIO4510',
        receptor: 'EUH4R27' 
    },
    {
        image: add_image,
        responsible: 'Mecânica',
        responsibleIcon: mechanic_circle_icon,
        sensor: 'RWET667',
        receptor: '86GTFD7'
    },
    {
        image: motor_2,
        responsible: 'Elétrica',
        responsibleIcon: eletric_circle_icon,
        sensor: 'TFV655',
        receptor: 'YTF265'
    }
]