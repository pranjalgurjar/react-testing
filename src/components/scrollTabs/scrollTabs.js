import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React from 'react'

const scrollTabs = (props) => {

	const { handleChange,Component,data,value } = props
	const {tabs} = data

	return (
		<>
		{tabs?.length?<TabContext value={value}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<TabList
					onChange={handleChange}
					variant='scrollable'
					scrollButtons='auto'
					aria-label="secondary tabs example"
					TabIndicatorProps={{ style: { background: '#886ffe', color: "#886ffe" } }}
				>
					{tabs && tabs?.map((item,index)=><Tab style={value===`${index}`?{ color: "#886ffe",fontWeight:"600" }:{color:"#A098AE",fontWeight:"600"}} label={item?.name} value={`${index}`} key={index} />)}
					
				</TabList>
			</Box>
			<TabPanel value={value}>
			<Component data={data}/>
			</TabPanel>
		</TabContext>:""}
		</>)
}

export default scrollTabs
