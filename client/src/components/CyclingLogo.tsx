import {
    Box,
    Image,
  } from '@chakra-ui/react'; 

//images
import cloud0 from '@/assets/cloud (0).png';
import cloud1 from '@/assets/cloud (1).png';
import cloud2 from '@/assets/cloud (2).png';
import cloud3 from '@/assets/cloud (3).png';
import cloud4 from '@/assets/cloud (4).png';
import cloud5 from '@/assets/cloud (5).png';
export const images = [cloud0,cloud1,cloud2,cloud3,cloud4,cloud5];

interface LogoProps {
    currentImageIndex: number;
    fade: boolean;
    images: string[]; // Array of image paths
}

const CyclingLogo: React.FC<LogoProps> = ({ currentImageIndex, fade, images }) => {
    return (
        <>
        {/*tmLogo()*/}
        <Box w="22%">
            <Image 
              src={images[currentImageIndex]} // Use the imported image
              alt="Cycle Image"
              width="100%"
              height="100%"
              objectFit="cover"
              opacity={fade ? 1 : 0} // Fade in/out
              transition="opacity 0.5s ease-in-out" // Smooth transition
              />
            </Box>
        </>
    )
} 
            
export default CyclingLogo;