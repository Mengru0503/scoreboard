function Teacher({ groups, setGroups }) {
  const addTaskScore = (groupId, value) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId
          ? { ...g, taskScore: g.taskScore + value }
          : g
      )
    );
  };

  const addLifeScore = (groupId, type, value = 1) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId
          ? {
              ...g,
              lifeScore: {
                ...g.lifeScore,
                [type]: g.lifeScore[type] + value
              }
            }
          : g
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>👩‍🏫 老師加分面板</h2>

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
