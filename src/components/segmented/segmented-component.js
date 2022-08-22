export const SegmentedComponent = ({activeTab, onItemPress}) => {
  return(
      <div className={'segmented-styles'}>
          {
              tabNames.map(({name, key})=>{
                  return(
                      <div
                          key={key}
                          onClick={()=> onItemPress(key)}
                          className={`segmented-item ${activeTab === key ? 'active':''}`}
                      >
                          {name}
                      </div>
                  )
              })
          }
      </div>
  )
}

const tabNames = [
    {
        name: 'Available',
        key: 'available'
    },
    {
        name: 'Pending',
        key: 'pending'
    },
    {
        name: 'Sold',
        key: 'sold'
    },
]
