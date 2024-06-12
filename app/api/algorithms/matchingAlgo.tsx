/*  
    Labels: l1, l2, l3, l4

    Users: u1, u2, u3

    Tasks: 
    l1 -> t1, t2, t3, t4
    l2 -> t5, t6
    l3 -> t7, t8, t9
    l4 -> t10, t11, t12
    
    PrefTable:
    u1 -> l1, l2, l3, l4
    u2 -> l3, l2, l4, l1
    u3 -> l2, l3, l1, l4

    Distribution: 3 tasks for each user
    --- 1st Iteration ---
    u1: t1
    u2: t7
    u3: t5

    --- 2nd Iteration ---
    u1: t1, t2
    u2: t7, t8
    u3: t5, t6

    --- 3rd Iteration ---
    u1: t1, t2, t3
    u2: t7, t8, t9
    u3: t5, t6, t4
    
    --- 4th Iteration ---
    u1: t1, t2, t3, t12
    u2: t7, t8, t9, t11
    u3: t5, t6, t4, t10

*/


interface UserData{
    id: string, // id of user, like email
    prefs: string[] // preference order of task labels of user from most liked to least
    accepted: boolean // true iff user accepted the invitation
}

interface Task {
    id: number,
    label: string,
}

interface matchingAlgoInput{
    users: UserData[],
    tasks: Task[]
}

export default function matchingAlgo(input: matchingAlgoInput){
    const labels: string[] = [];
    const tasksByLabel: any = {}; // label => tasks
    // const shuffledUsers: UserData[] = shuffleArray(input.users);
    const shuffledUsers: UserData[] = input.users
    
    let numberOfTasks = 0;

    input.tasks.forEach(task => {
        const curLabel = task.label;
        if(!labels.includes(curLabel)){
            labels.push(curLabel);
            tasksByLabel[curLabel] = [];
        }
        tasksByLabel[curLabel].push(task.id);
        numberOfTasks++;
    });

    const prefTable: any = {}; // user.id => user.prefs
    for(const user of shuffledUsers){
        if(!user.accepted) user.prefs = shuffleArray(labels);
        prefTable[user.id] = user.prefs;
    }

    const userIds = shuffledUsers.map(user => user.id);
    const res:any = {}; // user.id => assigned tasks
    for(const user of userIds) res[user] = [];

    let i = 0;
    let inc = true;
    while(numberOfTasks--){
        const curUser: string = userIds[i];
        for (const pref of prefTable[curUser]) {
            if (tasksByLabel[pref].length) {
                res[curUser].push(tasksByLabel[pref].shift());
                break;
            }
        }

        if(inc){
            i++;
            if(i === userIds.length) {
                inc = false;
                i--;
            }
        }else{
            i--;
            if(i === -1){
                inc = true;
                i++;
            }
        }
    }

    return res;
}

function shuffleArray(originalArray: any[]){
    const shuffledArray = originalArray.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export function testMatchingAlgo(){
    const users = [
        { id: 'u1', prefs: ['l1', 'l2', 'l3', 'l4'], accepted: true },
        { id: 'u2', prefs: ['l3', 'l2', 'l4', 'l1'], accepted: true },
        { id: 'u3', prefs: ['l2', 'l3', 'l1', 'l4'], accepted: true }
    ];
    
    const tasks = [
        { id: 1, label: 'l1' }, { id: 2, label: 'l1' }, { id: 3, label: 'l1' }, { id: 4, label: 'l1' },
        { id: 5, label: 'l2' }, { id: 6, label: 'l2' },
        { id: 7, label: 'l3' }, { id: 8, label: 'l3' }, { id: 9, label: 'l3' },
        { id: 10, label: 'l4' }, { id: 11, label: 'l4' }, { id: 12, label: 'l4' }
    ];
    
    const correctOutput: { [key: string]: number[] } = {
        u1: [1, 2, 3, 12],
        u2: [7, 8, 9, 11],
        u3: [5, 6, 4, 10]
    };
    
    const result = matchingAlgo({ users, tasks });
    let testPassed = true;
    for (const user in correctOutput) {
        if (JSON.stringify(result[user]) !== JSON.stringify(correctOutput[user])) {
            testPassed = false;
            console.log(`Mismatch for ${user}: Expected ${JSON.stringify(correctOutput[user])}, but got ${JSON.stringify(result[user])}`);
        }
    }

    if(!testPassed){
        console.log("Incorrect Result!");
        console.log("Expected Output: ", correctOutput);
        console.log("Algo's Output: ", result);
    } else{
        console.log("Test Passed!");
    }
}