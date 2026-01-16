import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

function Teacher({ groups, setGroups }) {
  const addTaskScore = async (groupId, value) => {
    const groupRef = doc(db, 'groups', groupId);
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    await updateDoc(groupRef, {
      taskScore: group.taskScore + value
    });
  };

  const addLifeScore = async (groupId, type, value = 1) => {
    const groupRef = doc(db, 'groups', groupId);
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    await updateDoc(groupRef, {
      lifeScore: {
        ...group.lifeScore,
        [type]: group.lifeScore[type] + value
      }
    });
  };

  // 新增：重置所有小組分數
  const resetScores = async () => {
    if (!window.confirm('確定要重置所有分數嗎？這個操作無法復原！')) return;

    for (const group of groups) {
      const groupRef = doc(db, 'groups', group.id);
      await updateDoc(groupRef, {
        taskScore: 0,
        lifeScore: {
          teamwork: 0,
          manners: 0,
          discipline: 0
        }
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>👩‍🏫 老師加分面板</h2>

      {/* 新增重置按鈕 */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={resetScores}
          style={{ backgroundColor: '#f44336', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 4 }}
        >
          重置所有分數
        </button>
      </div>

      {groups.map(group => {
        const lifeTotal = Object.values(group.lifeScore).reduce(
          (sum, v) => sum + v,
          0
        );

        return (
          <div
            key={group.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12
            }}
          >
            <h3>{group.name}</h3>
            <p>🎯 任務分數：{group.taskScore}</p>
            <p>🌱 生活分數：{lifeTotal}</p>

            <div style={{ marginBottom: 8 }}>
              <strong>任務加分：</strong>
              <button onClick={() => addTaskScore(group.id, 1)}>+1</button>{' '}
              <button onClick={() => addTaskScore(group.id, 3)}>+3</button>{' '}
              <button onClick={() => addTaskScore(group.id, 5)}>+5</button>{' '}
              <button onClick={() => addTaskScore(group.id, -1)}>-1</button>
            </div>

            <div>
              <strong>生活加分：</strong>
              <button onClick={() => addLifeScore(group.id, 'teamwork')}>團隊精神 +1</button>{' '}
              <button onClick={() => addLifeScore(group.id, 'manners')}>用餐禮儀 +1</button>{' '}
              <button onClick={() => addLifeScore(group.id, 'discipline')}>生活紀律 +1</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Teacher;