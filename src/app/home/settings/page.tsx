import ProfileUpdationRoute from '@/app/_components/forms/ProfileUpdationForm';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';

async function fetchData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      phoneNumber: true,
      pinCode: true,
      image: true,
      email: true,
    },
  });

  if (!data) {
    throw new Error('User not found');
  }

  return {
    firstName: data.firstName!,
    lastName: data.lastName!,
    phoneNumber: data.phoneNumber!,
    pinCode: data.pinCode!,
    image: data.image!,
    email: data.email!,
  };
}

export default async function SettingsRoute() {
  const user = await getUser();
  const data = await fetchData(user.id);

  return <ProfileUpdationRoute data={data} />;
}
