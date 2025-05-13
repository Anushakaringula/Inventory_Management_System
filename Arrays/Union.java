import java.util.*;
class Union
{
	public static void main(String args[])
	{
		int a[]=new int[]{1,1,2,3,4,4,5};
		int b[]=new int[]{1,2,3,5,6,7};
		Set<Integer> st=new HashSet<>();
		for(int i=0;i<a.length;i++)
		{
			st.add(a[i]);
		}
		for(int i=0;i<b.length;i++)
		{
			st.add(b[i]);
		}
		System.out.print(st);
	}
}			
