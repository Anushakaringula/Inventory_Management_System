import java.util.*;
class Solution {
    public int removeDuplicates(int[] nums) {
      if(nums.length==0)
      {
        return 0;
      }  
      int i=0;
      for(int j=1;j<nums.length;j++)
      {
        if(nums[j]!=nums[i])
        {
            i++;
            nums[i]=nums[j];
        }
      }
      return i+1;
    }
}
class Main
{
    public static void main(String args[])
    {
        Solution s=new Solution();
         int[] nums = new int[]{1, 2, 2, 1, 3, 3, 4, 3, 5};
         Arrays.sort(nums);
        int k=s.removeDuplicates(nums);
        System.out.print("elements of the array are:");
        for(int i=0;i<k;i++)
        {
            System.out.print(nums[i]);
        }
        System.out.print("\nnumber of unique elements are:"+k);
    }
}
