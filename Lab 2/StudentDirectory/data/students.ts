export interface Student {
    id: string;
    name: string;
    studentId: string;
    department: string;
    bio: string;
    skills: string[];
    avatarUrl: string;
}

export const STUDENTS: Student[] = [
    {
        id: "1",
        name: "Abdul Quayum",
        studentId: "22-12345-3",
        department: "Computer Science and Engineering",
        bio: "Undergraduate student majoring in Development with a minor in Artificial Intelligence. Passionate about building robust web applications and exploring machine learning.",
        skills: ["C++", "Java", "SQL", "C#", ".NET", "ASP.NET Core", "MVC Architecture", "Node.js", "React", "React Native", "Python"],
        avatarUrl: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: "2",
        name: "John Doe",
        studentId: "23-12346-1",
        department: "Computer Science",
        bio: "Passionate about mobile development and building tools that make everyday life easier.",
        skills: ["React Native", "TypeScript", "Node.js"],
        avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "3",
        name: "Emily Chen",
        studentId: "21-54321-2",
        department: "Software Engineering",
        bio: "Frontend enthusiast with a keen eye for accessible UI design and interactive web animations.",
        skills: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Tailwind CSS", "Figma"],
        avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "4",
        name: "Michael Chang",
        studentId: "22-98765-1",
        department: "Computer Science",
        bio: "Cloud architecture geek focused on scalable infrastructure, CI/CD pipelines, and containerization.",
        skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Go", "Linux"],
        avatarUrl: "https://i.pravatar.cc/150?img=8",
    },
    {
        id: "5",
        name: "Sarah Jenkins",
        studentId: "23-45678-3",
        department: "Data Science",
        bio: "Data-driven problem solver exploring deep learning models and predictive analytics.",
        skills: ["Python", "TensorFlow", "Pandas", "NumPy", "Jupyter", "SQL"],
        avatarUrl: "https://i.pravatar.cc/150?img=9",
    },
    {
        id: "6",
        name: "David Miller",
        studentId: "20-11223-2",
        department: "Information Technology",
        bio: "Backend specialist dedicated to building secure RESTful APIs and optimizing database queries.",
        skills: ["PHP", "Laravel", "MySQL", "Redis", "PostgreSQL", "GraphQL"],
        avatarUrl: "https://i.pravatar.cc/150?img=13",
    },
    {
        id: "7",
        name: "Jessica Wong",
        studentId: "22-33445-1",
        department: "Computer Engineering",
        bio: "Hardware-meets-software developer tinkering with IoT devices and embedded systems.",
        skills: ["C", "C++", "Arduino", "Raspberry Pi", "Assembly", "Python"],
        avatarUrl: "https://i.pravatar.cc/150?img=20",
    },
    {
        id: "8",
        name: "Marcus Johnson",
        studentId: "21-55667-3",
        department: "Cybersecurity",
        bio: "Ethical hacker and security researcher finding vulnerabilities before the bad guys do.",
        skills: ["Kali Linux", "Wireshark", "Metasploit", "Python", "Bash", "Penetration Testing"],
        avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    {
        id: "9",
        name: "Olivia Davis",
        studentId: "23-77889-2",
        department: "Software Engineering",
        bio: "Web3 advocate building decentralized applications and writing secure smart contracts.",
        skills: ["Solidity", "Ethereum", "Web3.js", "React", "Rust", "TypeScript"],
        avatarUrl: "https://i.pravatar.cc/150?img=35",
    },
    {
        id: "10",
        name: "Daniel Kim",
        studentId: "22-99001-1",
        department: "Computer Science",
        bio: "Indie game developer creating immersive 3D worlds and optimizing rendering pipelines.",
        skills: ["C#", "Unity3D", "Unreal Engine", "C++", "Blender", "HLSL"],
        avatarUrl: "https://i.pravatar.cc/150?img=53",
    }
];