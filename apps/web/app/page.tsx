import "dotenv/config";
import { prisma } from "@repo/db/client"

export default async function Home() {
  const user = await prisma.user.findFirst()
    
  return (
    <div>
      {user?.username}
      {user?.password}
    </div>
  );
}

// 2:15:00 
// github actions start
