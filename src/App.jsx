import { useEffect, useState } from 'react';
import Teacher from './pages/Teacher';
import { db } from './firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

function Screen({ groups }) {
  // 計算生活分數小計與總分
  const withTotals = groups.map(g => {
    const lifeTotal = Object.values(g.lifeScore).reduce((s, v) => s + v, 0);
    return {
      ...g,
      lifeTotal,
      totalScore: g.taskScore + lifeTotal
    };
  });

  // 即時競賽排名（任務分數）
  const taskRank = [...withTotals].sort((a, b) => b.taskScore - a.taskScore);

  // 總分排名
  const totalRank = [...withTotals].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ textAlign: 'center' }}>🏕️ 營隊小組積分牆</h1>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Day 1</h2>

      {/* 目前競賽分數 */}
      <section style={{ marginBottom: 32 }}>
        <h3>【目前競賽分數】（即時）</h3>
        <ol>
          {taskRank.map((g, index) => (
            <li key={g.id} style={{ fontSize: 20, marginBottom: 8 }}>
              {index === 0 && '🥇'}{index === 1 && '🥈'}{index === 2 && '🥉'}
              {g.name}　{g.taskScore} 分
            </li>
          ))}
        </ol>
      </section>

      {/* 生活表現積分 */}
      <section style={{ marginBottom: 32 }}>
        <h3>【生活表現積分】（累積）</h3>
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>小組</th>
              <th>團隊精神</th>
              <th>禮儀</th>
              <th>紀律</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {withTotals.map(g => (
              <tr key={g.id}>
                <td>{g.name}</td>
                <td>{g.lifeScore.teamwork}</td>
                <td>{g.lifeScore.manners}</td>
                <td>{g.lifeScore.discipline}</td>
                <td><strong>{g.lifeTotal}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 總積分排行榜 */}
      <section>
        <h3>【總積分排行榜】（最終）</h3>
        <ol>
          {totalRank.map((g, index) => (
            <li key={g.id} style={{ fontSize: 22, marginBottom: 8 }}>
              {index === 0 && '🥇'}{index === 1 && '🥈'}{index === 2 && '🥉'}
              {g.name}　{g.totalScore} 分
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function App() {
  const [view, setView] = useState('teacher');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'groups'), snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(data);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <div style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <button onClick={() => setView('teacher')}>老師畫面</button>{' '}
        <button onClick={() => setView('screen')}>投影畫面</button>
      </div>

      {view === 'teacher' && (
        <Teacher groups={groups} setGroups={setGroups} />
      )}

      {view === 'screen' && <Screen groups={groups} />}
    </div>
  );
}

export default App;
